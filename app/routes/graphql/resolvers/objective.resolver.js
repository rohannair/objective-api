import Squad from '../../../models/Squad';
import User from '../../../models/User';
import KeyResult from '../../../models/KeyResult';
import CheckIn from '../../../models/CheckIn';
import Resource from '../../../models/Resource';

const resolver = {
  Objective: {
    user(objective) {
      return User.query()
        .where('id', objective.userId)
        .first();
    },

    squad(objective) {
      return Squad.query()
        .where('id', objective.squadId)
        .first();
    },

    keyResults(objective) {
      return KeyResult.query()
        .where('objective_id', objective.id);
    },

    checkIns(objective) {
      return CheckIn.query()
        .where('objective_id', objective.id);
    },

    resources(objective) {
      return Resource.query()
        .where('objective_id', objective.id);
    }
  }
};

export default resolver;
