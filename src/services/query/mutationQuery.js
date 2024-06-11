export const loginQuery = `
mutation($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      token
      administrator {
        id
        firstName
        lastName
        email
        lastLogin
      }
    }
  }
  `;
