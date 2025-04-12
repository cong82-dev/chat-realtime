export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export enum FriendshipType {
  PRIVATE = 'private',
  GROUP = 'group',
}

export enum GroupRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
}

export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
  PENDING = 'pending',
  LOCKED = 'locked',
}

export enum FriendshipStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  BLOCKED = 'blocked',
  UNFRIENDED = 'unfriended',
}

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  TAKE: 10,
  ORDER_BY: OrderBy.ASC,
};
