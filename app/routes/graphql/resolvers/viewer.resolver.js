import UserResolver from './user.resolver';
import CheckIn from '../../../models/CheckIn';
import Squad from '../../../models/Squad';
import Objective from '../../../models/Objective';

const resolver = {
  Viewer: {
    ...UserResolver.User,

    squads(viewer) {
      return Squad.query()
        .where('company_id', viewer.companyId);
    },

    objectives(viewer) {
      return Objective.query()
        .where('company_id', viewer.companyId);
    },

    snapshots(viewer) {
      return CheckIn.query()
        .where('company_id', viewer.companyId)
        .orderBy('created_at', 'desc');
    }
  }
};

export default resolver;
