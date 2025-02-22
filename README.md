# Blood Bank Management System

## Project Overview
A comprehensive blood bank management system built with Next.js and MongoDB, designed to efficiently manage blood donations, inventory, and distribution.

### Developer
- **Name:** Mercy Wamaitha Mathu
- **Course:** Bachelor of Science in Information Technology (BIT)
- **Registration Number:** 22/00067

## 🚀 Features

### 1. Donor Management
- Complete donor registration system
- Blood type tracking
- Donation history management
- Contact information management

### 2. Blood Inventory
- Real-time blood unit tracking
- Blood type categorization
- Expiration date monitoring
- Storage location management

### 3. Recipient Management
- Recipient information database
- Blood type matching
- Transfusion history tracking

### 4. Reporting System
- Current blood stock reports
- Donation history reports
- Transfusion record reports

## 🛠 Technical Stack

- **Frontend:** Next.js 14
- **Backend:** Next.js API Routes
- **Database:** MongoDB
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS

## 📂 Project Structure

```
blood-bank-management/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── donors/
│   │   ├── inventory/
│   │   └── recipients/
│   ├── dashboard/
│   ├── donors/
│   ├── inventory/
│   ├── recipients/
│   └── reports/
├── components/
│   ├── ui/
│   ├── forms/
│   └── layout/
├── lib/
│   ├── mongodb/
│   └── utils/
└── models/
    ├── Donor.js
    ├── BloodUnit.js
    └── Recipient.js
```

## 💾 Database Schema

### Donor Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  bloodType: String,
  lastDonation: Date,
  medicalHistory: Object,
  donations: [{
    date: Date,
    units: Number,
    bloodType: String
  }]
}
```

### Blood Inventory Collection
```javascript
{
  _id: ObjectId,
  bloodType: String,
  units: Number,
  location: String,
  donationDate: Date,
  expiryDate: Date,
  status: String,
  donorId: ObjectId
}
```

### Recipient Collection
```javascript
{
  _id: ObjectId,
  name: String,
  bloodType: String,
  hospital: String,
  transfusions: [{
    date: Date,
    units: Number,
    bloodType: String
  }]
}
```

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/your-username/blood-bank-management.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
```

4. Run the development server
```bash
npm run dev
```

## 📈 Implementation Progress

### Completed Features ✅
- Basic project structure setup
- MongoDB connection configuration
- Basic schema design
- Initial API routes setup

### In Progress 🚧
- User interface development
- Form implementations
- Authentication system
- Report generation system

### Upcoming Features 🎯
- Advanced search functionality
- Email notifications
- Blood availability alerts
- Mobile responsiveness

## 📱 Screenshots
[Screenshots will be added as the UI development progresses]

## 📄 License
MIT License - feel free to use this project for educational purposes.