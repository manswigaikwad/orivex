# ORIVEX Admin Panel Guide

## Accessing the Admin Panel

1. **Admin Button**: Click the shield icon in the top-right corner of the website
2. **Login Credentials**:
   - Admin Key: `orivex_admin_2026`
   - ⚠️ **Important**: Change this key in production for security

## Admin Panel Features

### Dashboard Overview
- **Total Inquiries**: View total number of project inquiries
- **Status Breakdown**: 
  - New inquiries (blue)
  - In Progress (yellow)
  - Completed (green)
- **Real-time Stats**: See inquiry distribution by project type

### Managing Inquiries

#### View Inquiries
- All inquiries are displayed in a sortable table
- Columns include:
  - Name
  - Contact (email & phone)
  - Project Type
  - Technology
  - Budget Range
  - Deadline
  - Status
  - Submission Date

#### Update Status
- Click the status dropdown for any inquiry
- Available statuses:
  - **New**: Newly submitted inquiries
  - **In Progress**: Currently working on the project
  - **Completed**: Project delivered

#### Delete Inquiries
- Click the trash icon to delete an inquiry
- Confirmation dialog prevents accidental deletions

#### Search & Filter
- Use the search bar to filter by:
  - Name
  - Email
  - Phone number
  - Project type

### Export Data

#### CSV Export
- Click "Export CSV" button to download all inquiries
- Data includes all fields in spreadsheet format
- Filename format: `orivex_inquiries_YYYY-MM-DD.csv`
- Opens easily in Excel, Google Sheets, or any spreadsheet software

#### Excel Integration
The exported CSV file contains:
- Name
- Email
- Phone Number
- Project Type
- Technology
- Deadline
- Budget Range
- Additional Requirements
- Status
- Submission Timestamp

### Data Management Tips

1. **Regular Exports**: Export data weekly for backup
2. **Status Updates**: Keep statuses current for accurate reporting
3. **Search Feature**: Use search to quickly find specific inquiries
4. **Filter by Status**: Click status badges to view similar inquiries

## Backend Architecture

### API Endpoints

All endpoints require the `X-Admin-Key` header (except form submission):

1. **POST /make-server-0134e8c8/submit-inquiry**
   - Public endpoint for form submissions
   - Validates required fields
   - Returns inquiry ID

2. **GET /make-server-0134e8c8/inquiries**
   - Admin only
   - Returns all inquiries sorted by date

3. **POST /make-server-0134e8c8/update-inquiry-status**
   - Admin only
   - Updates inquiry status
   - Body: `{ inquiryId, status }`

4. **DELETE /make-server-0134e8c8/inquiry/:id**
   - Admin only
   - Deletes specific inquiry

5. **GET /make-server-0134e8c8/stats**
   - Admin only
   - Returns dashboard statistics

### Data Storage

- All data is stored in Supabase KV store
- Prefix: `inquiry_`
- Auto-generated unique IDs
- Timestamp tracking
- Status management

## Security Considerations

### Production Deployment

⚠️ **Before going live, update the following**:

1. **Change Admin Key**
   - Update in `/supabase/functions/server/index.tsx`
   - Change all instances of `orivex_admin_2026`
   - Use a strong, unique key

2. **Environment Variables**
   - Store admin key in environment variables
   - Never commit keys to version control

3. **HTTPS Only**
   - Ensure all traffic uses HTTPS
   - Supabase provides this by default

4. **Data Protection**
   - Comply with GDPR/privacy regulations
   - Implement data retention policies
   - Regular backups

### Best Practices

1. **Regular Password Changes**: Update admin key quarterly
2. **Access Logs**: Monitor admin panel access
3. **Data Encryption**: Supabase provides encryption at rest
4. **Backup Strategy**: Regular CSV exports for disaster recovery

## Troubleshooting

### Common Issues

**Can't Login to Admin Panel**
- Verify admin key is correct
- Check browser console for errors
- Ensure backend is running

**Inquiries Not Loading**
- Check network tab in browser dev tools
- Verify Supabase connection
- Check server logs

**Export Not Working**
- Ensure pop-up blockers are disabled
- Check browser download settings
- Try different browser

**Status Update Fails**
- Verify admin key is valid
- Check inquiry ID exists
- Review server error logs

## Contact & Support

For technical issues or questions:
- Email: manswiproject11@gmail.com
- Phone: +91 98765 43210
- WhatsApp: Available 24/7

---

**Last Updated**: January 2026
**Version**: 1.0.0
