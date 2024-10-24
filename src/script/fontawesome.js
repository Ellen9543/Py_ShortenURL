import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faLink as faLink,
  faCopy as faCopy,
  faCloudArrowDown as faCloudArrowDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(faLink, faCopy, faCloudArrowDown);
dom.i2svg();
