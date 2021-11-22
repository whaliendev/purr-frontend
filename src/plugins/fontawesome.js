import { library } from '@fortawesome/fontawesome-svg-core';
// import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
// import {
//   faPlane,
//   faThLarge,
//   faPen,
//   faCommentDots,
//   faPaperPlane,
//   faFileAlt,
//   faMusic,
//   faLink,
//   faWrench,
//   faChevronDown,
//   faChevronRight,
//   faChevronLeft,
//   faPlusCircle,
//   faBars,
//   faHeart,
//   faEye,
//   faAngleLeft,
//   faAngleRight,
//   faSearch,
//   faUndoAlt,
//   faPlus,
//   faEdit,
//   faTrashAlt,
//   faCog
// } from '@fortawesome/free-solid-svg-icons';

// regular svg
// library.add([faUser, faEnvelope]);

// // solid svg
// library.add([
//   faPlane,
//   faPaperPlane,
//   faThLarge,
//   faPen,
//   faCommentDots,
//   faFileAlt,
//   faMusic,
//   faLink,
//   faWrench,
//   faChevronDown,
//   faChevronLeft,
//   faChevronRight,
//   faPlusCircle,
//   faBars,
//   faHeart,
//   faEye,
//   faAngleRight,
//   faAngleLeft,
//   faSearch,
//   faUndoAlt,
//   faPlus,
//   faEdit,
//   faTrashAlt,
//   faCog
// ]);

// when deploy to certain server, we can use tree shaking to minimize the imported icons
library.add(fas);
library.add(fab);
library.add(far);
