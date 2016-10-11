const Target = require('../../models/Target');

const targetsController = Target => ({
  updateTarget: async ctx => {
    const { targetId } = ctx.params;
    const updated = await Target
      .query()
      .update({
        ...ctx.request.body
      })
      .where({ id: targetId })
      .returning(['id', 'objective', 'key_results', 'updated_at'])
      .first();

    ctx.body = { updated };
  }
})

module.exports = targetsController(Target);
