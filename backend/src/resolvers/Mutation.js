const Mutations = {
  // async createItem(parent, args, ctx, info) {
  // 	// TODO Check if they are logged in

  // 	const item = await ctx.db.mutation.createItem({
  // 		data: {...args}
  // 	}, info);
  // 	return item;
  // }

  async createCase(parent, args, ctx, info) {
    const newCase = await ctx.db.mutation.createCase(
      {
        data: { ...args }
      },
      info
    );
    return newCase;
  }
};

module.exports = Mutations;
