# Student Repository System

## Overview

The Student Repository System is a comprehensive solution designed to manage and streamline student data within educational institutions. This system allows students to maintain and update their profiles, faculty to generate reports, and administrators to manage user accounts effectively. The project is built using Firebase for authentication and database management, ensuring secure and reliable data handling.

## Features

- **Student Profile Management**: Students can create and update their profiles, upload documents, and track their academic progress.
- **Faculty Access and Reporting**: Faculty members can access student data, filter through it, and generate detailed reports.
- **Admin User Management**: Administrators can view, update, and manage user accounts and permissions.
- **Super Admin Controls**: Super admins have the ability to add new users, assign roles, and manage the overall system.

## System Roles

- **Student**: Can update personal information, upload documents, and view their academic progress.
- **Faculty**: Can access and filter student data, and generate reports.
- **Admin**: Can manage user accounts and permissions.
- **Super Admin**: Can add new users, assign roles, and oversee the entire system.

## Implementation

### Super Admin Page

1. **Access**: The super admin page is protected by an access code (e.g., 0827).
2. **Add User**: Super admins can add users by providing an email, password, and assigning a role (student, faculty, or admin).
3. **Database Integration**: Added users are listed in the Firebase authentication database with a unique user ID.

### Login Page

- Users enter their email and password.
- Based on their role, they are redirected to the appropriate dashboard.

### Dashboards

- **Student Dashboard**: Allows students to manage their profiles and view their academic records.
- **Faculty Dashboard**: Enables faculty members to access student data and generate reports.
- **Admin Dashboard**: Provides administrators with tools to manage user accounts.
- **Super Admin Dashboard**: Allows super admins to add users and manage system-wide settings.

## Getting Started

### Prerequisites

- Node.js
- Firebase Account

## Usage

- **Super Admin Access**: Navigate to the super admin page and enter the access code to add users.
- **User Login**: Use the login page to access the system based on your role.
- **Dashboard Operations**: Perform actions based on the dashboard functionalities available to your role.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact us at [tanaypatil25@gmail.com].

---

Thank you for using the Student Repository System! We hope it enhances the management and utilization of student data in your educational institution.
```
