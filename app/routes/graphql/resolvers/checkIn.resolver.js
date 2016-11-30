import User from '../../../models/User';
import Objective from '../../../models/Objective';

const resolver = {
  CheckIn : {
    user(checkin) {
      return User.query()
        .where('id', checkin.userId)
        .first();
    },

    objective(checkin) {
      return Objective.query()
        .where('id', checkin.objectiveId)
        .first();
    },
  }
};

export default resolver;
