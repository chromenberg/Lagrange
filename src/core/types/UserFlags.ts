export enum UserFlags {
  NONE,
  STAFF, // SHIFTED ZERO - 1<<0 == index 1
  USED_DESKTOP_CLIENT = 39,
  USED_WEB_CLIENT = 40
}