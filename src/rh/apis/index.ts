import { CustomApi } from "./custom-api";
import { Api as Base } from "./Base/Api";

const RhApi = {
  Custom: new CustomApi(),
  Base: new Base(),
};

export default RhApi;
