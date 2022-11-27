export const createTree = (data) => {
    const idMapping = data.reduce((acc, el, i) => {
        acc[el.id] = i;
        return acc;
      }, {});
      let root;
      data.forEach((el) => {
        // Handle the root element
        if (el.manager_id === null) {
          root = el;
          return;
        }
        // Use our mapping to locate the parent element in our data array
        const parentEl = data[idMapping[el.manager_id]];
        // Add our current el to its parent's `children` array
        parentEl.children = [...(parentEl.children || []), el];
      });    
   return root;
}