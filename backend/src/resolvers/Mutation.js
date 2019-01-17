const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  // ===========================================================
  // Create a case logic
  // ===========================================================
  async createCase(parent, args, ctx, info) {
    const newCase = await ctx.db.mutation.createCase(
      {
        data: { ...args }
      },
      info
    );
    return newCase;
  },
  // ===========================================================
  // Delete a case logic
  // ===========================================================
  async deleteCase(parent, args, ctx, info) {
    const where = { id: args.id };
    const item = await ctx.db.query.case({ where }, `{id}`);
    return ctx.db.mutation.deleteCase({ where }, info);
  },
  // ===========================================================
  // Signup/Create User logic
  // ===========================================================
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // hash the user password
    const salt = bcrypt.genSaltSync(16);
    const hash = bcrypt.hashSync(args.password, salt);
    // Create the user
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          name: args.name,
          email: args.email,
          password: hash,
          permissions: { set: ['USER'] }
        }
      },
      info
    );
    // create JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // Set JWT Cookie on the response
    ctx.response.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 365, // Cookie set to expire in 1 year
      httpOnly: true
    });
    // return user to the browser
    return user;
  }
  // ===========================================================
  // ===========================================================
};

module.exports = Mutations;
