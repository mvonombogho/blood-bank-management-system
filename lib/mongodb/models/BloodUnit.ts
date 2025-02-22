import mongoose from 'mongoose';

const bloodUnitSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    required: [true, 'Blood type is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true,
  },
  donationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  collectionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'used', 'expired', 'discarded'],
    default: 'available',
  },
  location: {
    storageUnit: {
      type: String,
      required: true,
    },
    shelf: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  volume: {
    type: Number,
    required: true,
    min: 0,
  },
  temperature: {
    type: Number,
    required: true,
  },
  testResults: {
    hiv: {
      type: String,
      enum: ['negative', 'positive', 'pending'],
      default: 'pending',
    },
    hepatitisB: {
      type: String,
      enum: ['negative', 'positive', 'pending'],
      default: 'pending',
    },
    hepatitisC: {
      type: String,
      enum: ['negative', 'positive', 'pending'],
      default: 'pending',
    },
    syphilis: {
      type: String,
      enum: ['negative', 'positive', 'pending'],
      default: 'pending',
    },
  },
  processingDetails: {
    processedBy: String,
    processingDate: Date,
    notes: String,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipient',
  },
  transfusionDate: Date,
}, {
  timestamps: true,
});

// Indexes
bloodUnitSchema.index({ bloodType: 1, status: 1 });
bloodUnitSchema.index({ expiryDate: 1 });
bloodUnitSchema.index({ donorId: 1 });
bloodUnitSchema.index({ 'location.storageUnit': 1 });

// Virtual for remaining shelf life
bloodUnitSchema.virtual('remainingShelfLife').get(function() {
  if (!this.expiryDate) return 0;
  return Math.max(0, Math.ceil((this.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
});

// Pre-save middleware to set expiry date if not set
bloodUnitSchema.pre('save', function(next) {
  if (!this.expiryDate && this.collectionDate) {
    const expiryDate = new Date(this.collectionDate);
    expiryDate.setDate(expiryDate.getDate() + 42); // 42 days shelf life for whole blood
    this.expiryDate = expiryDate;
  }
  next();
});

// Method to check if blood unit is suitable for transfusion
bloodUnitSchema.methods.isSuitableForTransfusion = function(): boolean {
  return (
    this.status === 'available' &&
    this.testResults.hiv === 'negative' &&
    this.testResults.hepatitisB === 'negative' &&
    this.testResults.hepatitisC === 'negative' &&
    this.testResults.syphilis === 'negative' &&
    this.remainingShelfLife > 0
  );
};

export const BloodUnit = mongoose.models.BloodUnit || mongoose.model('BloodUnit', bloodUnitSchema);