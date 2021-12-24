export interface BaseResultOfUserResp {
  /** @format int32 */
  code?: number;
  data?: UserResp;
  desc?: string;
  success?: boolean;
}

export interface BaseResultOfboolean {
  /** @format int32 */
  code?: number;
  data?: boolean;
  desc?: string;
  success?: boolean;
}

/**
 * 登录返回参数对象
 */
export interface DengLuFanHuiCanShuDuiXiang {
  /**
   * 过期时间
   * @format int64
   */
  expireTime?: number;

  /** 是否首次登录 */
  firstLogin?: boolean;

  /** token */
  token?: string;
}

export interface UserResp {
  /** #地址# */
  address?: string;

  /** #头像url# */
  avatarUrl?: string;

  /**
   * #生日#
   * @format date-time
   */
  birthday?: string;

  /** #联系电话# */
  contactNumber?: string;

  /**
   * #创建时间#
   * @format date-time
   */
  createTime?: string;

  /** #创建人# */
  creator?: string;

  /** #邮箱# */
  email?: string;

  /**
   * #第一次登录时间#
   * @format date-time
   */
  firstLoginTime?: string;

  /**
   * #主键id#
   * @format int64
   */
  id?: number;

  /**
   * #最后登录时间#
   * @format date-time
   */
  lastLoginTime?: string;

  /** #手机# */
  mobile?: string;

  /** #修改人# */
  modifier?: string;

  /** #昵称# */
  nickname?: string;

  /** #密码# */
  password?: string;

  /** #真实姓名# */
  realName?: string;

  /** #备注# */
  remark?: string;

  /** #性别#ENUM#1:男:MALE,2:女:FEMALE,3:未知:UNKNOWN# */
  sex?: "MALE" | "FEMALE" | "UNKNOWN";

  /** #用户状态#ENUM#1:未激活:UN_ACTIVE,2:已激活:ACTIVE# */
  status?: "UN_ACTIVE" | "ACTIVE";

  /** #用户类型#ENUM#1:管理员:ADMIN# */
  type?: "USER" | "ADMIN";

  /** #是否修改过密码# */
  updatePwd?: boolean;

  /**
   * #修改时间#
   * @format date-time
   */
  updateTime?: string;

  /** #用户名# */
  username?: string;
}

export interface YongHuMingMiMaDengLuQingQiuCanShu {
  /** 手机号 */
  mobile: string;

  /** 密码，要经过rsa加密, 再进行base64编码 */
  password: string;
}
