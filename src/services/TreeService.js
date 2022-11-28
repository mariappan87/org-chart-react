import _ from 'lodash';

export const createTree = (data) => {
  const clonedData = _.cloneDeep(data);
  const idMapping = clonedData.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});
 
  let root;
  clonedData.forEach((el) => {
    // Handle the root element
    if (el.manager_id === null) {
      root = el;
      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = clonedData[idMapping[el.manager_id]];
    // Add our current el to its parent's `children` array
    parentEl.children = [...(parentEl.children || []), el];
  });
  return root;
};

export const createSubTree = (data) => {
  const teamUserIds = _.map(data, 'id');
  
  //set the root node
  const subTreeData = _.cloneDeep(data).map((user) => {
    if (!teamUserIds.includes(user.manager_id)) {
      user.manager_id = null;
    };
    return user;
  });

  return createTree(subTreeData);
};