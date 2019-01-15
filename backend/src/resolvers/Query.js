const { forwardTo } = require('prisma-binding');

const Query = {
  cases: forwardTo('db'),
  case: forwardTo('db')
  // async items(parent, args, ctx, info) {
  // 	const items = await ctx.db.query.items();
  // 	return items;
  // }
};

module.exports = Query;
