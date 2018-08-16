import React from 'react';

import { updateCMDData } from 'api/auth';

import BaseComponentEditModal from './BaseComponentEditModal';
import ComponentRearrangeModal from './ComponentRearrangeModal';

class ComponentEditor extends React.Component {
  render() {
    return (
      <div>
        {
          showComponentSpecificPopup ?
            <BaseComponentEditModal
              editableDataPoints={editableDataPoints}
              cancelCB={this.updateCMDData}
            />
            : null
        }
      </div>
    );
  }
}

export default ComponentEditor;