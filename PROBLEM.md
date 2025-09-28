# Rules
- You are allowed to use AI to generate code
- You can leverage shadCN component library, It has been already installed in the code base. You need to install the required components directly.
- The whole design should be completely responsive.
- Only use tailwind CSS, to style the components.
- Please create a branch called `solution/<your_name>`

# Scoring
- You will be judged on 
  - design choices
  - code modularity
  - time taken to finish the code

# Problem Statement
1. You need to develop a paginated products page which displays the product card with a plus and minus button below the card image.
   1. You can fetch the products using the following API
   2. ```GET: https://dummyjson.com/products?limit=10&skip=10```
2. User should be able to add and subtract any number of products.
3. There should be a button called Place Order.
   1. This button should open a dialog, which shows the summary of order
   2. Has a small form with First Name, Last Name, Email ID and Birth date fields
   3. There should be a confirm order button on the dialog
4. On click of the confirm order button, Its an open choice of what should happen, decide yourself.
