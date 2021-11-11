const mutations = {
  storeHomePageMenu(state, payload) {
    const iconStringMenuList = payload.menuList;
    const menuList = [];
    iconStringMenuList.forEach((menuItem) => {
      const subMenuItems = menuItem.subMenuItems;
      const norSubMenuItems = [];
      if (subMenuItems !== null) {
        subMenuItems.forEach((subMenuItem) => {
          norSubMenuItems.push({
            iconList: subMenuItem.icon
              .trim()
              .split(/(\s+)/)
              .filter((part) => part.trim().length > 0),
            id: subMenuItem.id,
            isParent: subMenuItem.isParent,
            name: subMenuItem.name,
            target: subMenuItem.target,
            url: subMenuItem.url
          });
        });
      }
      menuList.push({
        iconList: menuItem.icon
          .trim()
          .split(/(\s+)/)
          .filter((part) => part.trim().length > 0),
        id: menuItem.id,
        isParent: menuItem.isParent,
        name: menuItem.name,
        subMenuItems: norSubMenuItems,
        target: menuItem.target,
        url: menuItem.url
      });
    });
    state.menuList = menuList;
  }
};

export default mutations;
