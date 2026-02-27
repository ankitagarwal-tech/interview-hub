# Rules
- You can leverage shadCN component library, It has been already installed in the code base. You need to install the required components directly.
- The whole design should be completely responsive.
- Only use tailwind CSS, to style the components.
- Please create a branch called `solution/prashant_garg`

# Scoring
- You will be judged on 
  - design choices
  - code modularity

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

# Things to note
- Make the code as modular as possible.
- Make the code as reusable as possible.
- Make the code as maintainable as possible.
- Make the code as readable as possible.
- Make the code as performant as possible.
- Use the provided image (LayoutDesign.png) strictly for the design.
- You are free to add tailwind CSS classes to the components to make them look better.
- Use react custom hooks properly to fetch data from the API.
- Add required loading states while fetching data from the API.
- For smaller screen sizes, the design should be responsive and should show single product item per row.


# Components to be created. These are for reference, feel free to create your own components.
 - Product
      - Image
      - Buttons
      - Selection counter
 - ProductList
 - OrderDialog
      - Form
      - Summary
      - Confirm Order Button
- Pageination component
   - Previous and Next buttons
- Cart button => Place Order button
