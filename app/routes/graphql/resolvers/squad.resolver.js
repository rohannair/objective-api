import Company from '../../../models/Company';
import Objective from '../../../models/Objective';
import User from '../../../models/User';

const resolver = {
  Squad: {
    company(squad) {
      return Company.query()
        .where('id', squad.company_id);
    },

    users(squad) {
      return User.query()
        .where('squad_id', squad.id);
    },

    leader(squad) {
      return User.query()
        .where('id', squad.leader)
        .first();
    },

    objectives(squad) {
      return Objective.query()
        .whereNull('user_id')
        .andWhere('squad_id', squad.id);
    }
  }
}

export default resolver;
