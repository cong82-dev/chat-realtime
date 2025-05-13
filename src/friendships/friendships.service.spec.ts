import { FriendshipsService } from './friendships.service';
import { FriendshipRepository } from '@app/common/repositories/friendship.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('FriendshipsService', () => {
  let friendshipsService: FriendshipsService;
  let friendshipRepository: FriendshipRepository;
  let usersService: any;

  const mockFriendshipRepository = {
    findFriendshipBetweenUsers: jest.fn(),
    create: jest.fn(),
  };

  const mockUsersService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendshipsService, { provide: FriendshipRepository, useValue: mockFriendshipRepository }],
    }).compile();

    friendshipsService = module.get<FriendshipsService>(FriendshipsService);
    friendshipRepository = module.get<FriendshipRepository>(FriendshipRepository);
    usersService = module.get<any>('UsersService');
  });
  it('should be defined', () => {
    expect(friendshipsService).toBeDefined();
  });

  /// tes this fuctinonasync sendFriendRequest(initiatorId: string, recipientId: string) {
  //   const existingRequest = await this.friendshipRepository.findFriendshipBetweenUsers(initiatorId, recipientId);

  //   if (existingRequest) {
  //     throw new ConflictException(ERROR_MESSAGE.FRIENDSHIPS.FRIEND_REQUEST_ALREADY_ACCEPTED);
  //   }

  //   const [initiator, recipient] = await this.findUsersByIds(initiatorId, recipientId);
  //   if (!recipient || !initiator) {
  //     throw new BadRequestException(ERROR_MESSAGE.FRIENDSHIPS.FRIEND_REQUEST_NOT_FOUND);
  //   }

  //   await this.createFriendRequest(initiator, recipient);
  //   return {
  //     message: SUCCESS_MESSAGE.FRIENDSHIPS.FRIEND_REQUEST_SENT,
  //   };
  // }
});
