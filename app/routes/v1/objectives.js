import Objective from '../../models/Objective';

const objectivesController = Objective => ({
  updateObjective: async ctx => {
    const { objectiveId } = ctx.params;
    const updated = await Objective
      .query()
      .update({
        ...ctx.request.body
      })
      .where({ id: objectiveId })
      .returning(['id', 'name', 'completed', 'updated_at'])
      .first();

    ctx.body = { updated };
  }
})

module.exports = objectivesController(Objective);
