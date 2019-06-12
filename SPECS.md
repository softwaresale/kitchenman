
# Kitchenman Specs

## Purpose
The purpose of this website is to provide the user with a system
to store, manage, and plan meals through the management of recipes.
The user should be able to store recipes, modify them, create meal
plans for lengths of time, and generate shopping lists based off of
these meal plans.

## Overall Description
Kitchenman will be comprised of two parts: a Granular RESTful API and 
a frontend. The API will:
- Control CRUD operations for User, Recipe, List, and Plan models
- Create lists based off of plans
- Allow recipes and lists to be shared with other users

The frontend will provide an interface to the API. It will have pages
to modify and view the different API endpoints.

## System Features and Requirements

### Functional Requirements

#### The Backend
The API will be implemented in _______. 
There will be 4 models. Each will have:
- An ID
- A Name

User will have email/pass credentials as well as a One-to-Many relationship
with all of the recipes, lists, and plans that are authored by that user.

Recipes will have a description, images, list of ingredients, list of directions,
and a Many-to-One relationship with the author.

A List will have an array of ingredients and prices, and a Many-to-One relationship
with the User.

A Plan will have a description, array of recipes, and a Many-to-One relationship with
its author.

The API will have the following endpoints:
- Users: `/api/v1/users/`
- Recipes: `/api/v1/recipes/`
- Lists: `/api/v1/lists/`
- Plans: `/api/v1/plans/`

Each endpoint will support basic CRUD operations.

#### The Frontend
The frontend will be written in Angular 8 with Angular Material Design.

Each API endpoint will have a page. There will be a component for viewing all of a model
(i.e get all) and viewing specific items of a model (i.e get by id). Each page will also
have a form to preform CRUD operations of a model.

### Nonfunctional Requirements

#### Authentication
Kitchenman will use JWTs to authorize API endpoints. Users will be verified by Username/Password
credentials stored in the database. Each JWT will contain the user's id, scopes, and expiry. Once
the user logs in via his or her credentials, the API will issue a JWT. This JWT will be used by
the client to access the API.
