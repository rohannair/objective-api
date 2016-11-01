'use strict';
import Resource from '../../models/Resource';

const resourceControllers = Resource => ({
  updateResource: async ctx => {
    const { resourceId } = ctx.params;
    const updated = await Resource
      .query()
      .update({
        ...ctx.request.body
      })
      .where({ id: resourceId })
      .returning(['id', 'name', 'updated_at'])
      .first();

    ctx.body = { updated };
  }
})

module.exports = resourceControllers(Resource);
