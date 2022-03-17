interface Page<T> {
  list?: Array<T>;
  page?: number;
  pageSize?: number;
  total?: number;
  totalPage?: number;
}

type UserInfo = {
  userId?: number;
  userName?: string;
  profilePicture?: string;
};

interface AjaxResponse<T = any> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

interface File {}

declare var $toast: any;
