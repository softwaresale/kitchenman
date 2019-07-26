
# TODO

## Concepts
- [ ] Create an ingredient database
- [ ] Support profile images and recipe images
- [ ] Create lists

## Frontend

### New Features
- [x] Add component for editing ingredient lists
- [x] Add component for editing direction lists
- [x] Add authentication button and service
- [ ] Overhaul profile view component to show info
- [ ] Add endpoint/button/component for editing recipes
- [ ] Create dashboard view to show 3 recipes

### Existing features

#### Ingredient List
- [x] Add list subheading

#### Direction List
- [x] Add list subheading

#### Ingredient Edit List
- [ ] Add validation for qty (numbers must be positive)
- [ ] Add buttons to delete ingredients

#### Direction Edit List
- [ ] Add button for deleting directions
- [ ] Drag and drop order of directions

#### Recipe service
- [x] Connect to API

#### Login buttons
- [ ] Use avatar button for profile instead of 'profile'
- [ ] Consider raising signup/profile button

### Misc
- [ ] Add buttons to recipes to go to edit page

## Backend

### Misc
- [ ] Use pluralize to make unit names plural if necessary
- [ ] Need exception filters so that not everything is a 500
- [ ] Make database migrations

### Existing endpoints

#### Users
- [ ] Serialize recipes to only their names

#### Recipe
- [ ] Add data validation
- [ ] Serialize author to only username or full name
