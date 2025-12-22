# This is the API for the project Konnektor

A simple express application with funtionalities of

- Sign Up ✅
- Log in ✅
- Add a Social Profile
- Generate a QR code that gives all social profiles attached to their account

## Users

There is only one type of user in this application

- Users (user)

A User can:

- Create their profile with their own Unique QR Code
- Add/Edit/Delete social links in their profile
- Create an Event on the application
- Add other Users profile to specific events
- View all events
- Edit/Delete Events

## Resources

- User
- Event
- SocialProfile

## Relationships

- Users -> Events: User creates multiples Events
- Users -> SocialProfile: User adds multiple SocialProfiles to their account
- Events -> User: An event created by a user can have the profiles of multiple other users
