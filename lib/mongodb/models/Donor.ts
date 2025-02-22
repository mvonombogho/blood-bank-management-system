import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  units: {
    type: Number,
    required: true,
    min: 1,
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  notes: String,
}, {
  timestamps: true,
});

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  bloodType: {
    type: String,
    required: [true, 'Blood type is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other'],
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  medicalHistory: {
    diseases: [String],
    medications: [String],
    allergies: [String],
    lastCheckup: Date,
  },
  donations: [donationSchema],
  status: {
    type: String,
    enum: ['active', 'inactive', 'blacklisted'],
    default: 'active',
  },
  lastDonation: Date,
  nextEligibleDate: Date,
}, {
  timestamps: true,
});

// Indexes
donorSchema.index({ email: 1 }, { unique: true });
donorSchema.index({ bloodType: 1 });
donorSchema.index({ status: 1 });

// Methods
donorSchema.methods.isEligibleToDonate = function(): boolean {
  if (!this.lastDonation) return true;
  
  const lastDonationDate = new Date(this.lastDonation);
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  return lastDonationDate <= threeMonthsAgo;
};

// Pre-save middleware to update lastDonation and nextEligibleDate
donorSchema.pre('save', function(next) {
  if (this.donations && this.donations.length > 0) {
    const sortedDonations = this.donations.sort((a, b) => 
      b.date.getTime() - a.date.getTime()
    );
    
    this.lastDonation = sortedDonations[0].date;
    
    const nextEligible = new Date(this.lastDonation);
    nextEligible.setMonth(nextEligible.getMonth() + 3);
    this.nextEligibleDate = nextEligible;
  }
  next();
});

export const Donor = mongoose.models.Donor || mongoose.model('Donor', donorSchema);