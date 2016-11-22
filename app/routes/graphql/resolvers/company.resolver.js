import Squad from '../../../models/Squad';
import User from '../../../models/User';

const resolver = {
  Company: {
    users(company) {
      return User.query()
        .where('company_id', company.id);
    },

    squads(company) {
      return Squad.query()
        .where('company_id', company.id);
    }
  }
}

export default resolver;
