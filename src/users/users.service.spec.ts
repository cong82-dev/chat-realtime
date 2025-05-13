import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from '@app/common/repositories/users.repository';
import { UserEntity } from '@app/database/entities/users.entity';
import { BadRequestException } from '@nestjs/common';
import { OrderBy } from '@app/common/constants';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: UserRepository;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findUserByEmail: jest.fn(),
    findOneById: jest.fn(),
    getAllUsers: jest.fn(),
    updateUserRefreshToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: UserRepository, useValue: mockUserRepository }],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create and save a new user successfully', async () => {
      const userData = { email: 'test@example.com', name: 'Test User' };
      const user = new UserEntity();
      Object.assign(user, userData);

      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockResolvedValue(user);

      const result = await usersService.createUser(userData);

      expect(result).toEqual(user);
      expect(mockUserRepository.create).toHaveBeenCalledWith(userData);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });

    it('should throw a BadRequestException if save fails', async () => {
      const userData = { email: 'test@example.com', name: 'Test User' };
      const errorMessage = 'Database error';
      const error = new Error(errorMessage);

      mockUserRepository.create.mockReturnValue({} as UserEntity);
      mockUserRepository.save.mockRejectedValue(error);

      await expect(usersService.createUser(userData)).rejects.toThrow(new BadRequestException(errorMessage));
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user when found by email', async () => {
      const email = 'test@example.com';
      const user = new UserEntity();
      user.email = email;

      mockUserRepository.findUserByEmail.mockResolvedValue(user);

      const result = await usersService.findUserByEmail(email);

      expect(result).toEqual(user);
      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(email);
    });

    it('should return null if user is not found by email', async () => {
      const email = 'notfound@example.com';

      mockUserRepository.findUserByEmail.mockResolvedValue(null);

      const result = await usersService.findUserByEmail(email);

      expect(result).toBeNull();
      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe('findUserById', () => {
    it('should return a user when found by id', async () => {
      const id = '123';
      const user = new UserEntity();
      user.id = id;

      mockUserRepository.findOneById.mockResolvedValue(user);

      const result = await usersService.findUserById(id);

      expect(result).toEqual(user);
      expect(mockUserRepository.findOneById).toHaveBeenCalledWith(id);
    });

    it('should return null if user is not found by id', async () => {
      const id = '123';

      mockUserRepository.findOneById.mockResolvedValue(null);

      const result = await usersService.findUserById(id);

      expect(result).toBeNull();
      expect(mockUserRepository.findOneById).toHaveBeenCalledWith(id);
    });
  });

  describe('getAllUsers', () => {
    it('should return paginated users', async () => {
      const pagination = { page: 1, limit: 10, take: 10, orderBy: OrderBy.ASC };
      const users: UserEntity[] = [new UserEntity()];
      const paginationResult = { data: users, total: 1 };

      mockUserRepository.getAllUsers.mockResolvedValue(paginationResult);

      const result = await usersService.getAllUsers(pagination);

      expect(result).toEqual(paginationResult);
      expect(mockUserRepository.getAllUsers).toHaveBeenCalledWith(pagination);
    });
  });

  describe('updateUserRefreshToken', () => {
    it('should update the refresh token for the user', async () => {
      const userId = '123';
      const hashedRt = 'hashed_refresh_token';

      mockUserRepository.updateUserRefreshToken.mockResolvedValue(undefined);

      await usersService.updateUserRefreshToken(userId, hashedRt);

      expect(mockUserRepository.updateUserRefreshToken).toHaveBeenCalledWith(userId, hashedRt);
    });

    it('should throw a BadRequestException if update fails', async () => {
      const userId = '123';
      const hashedRt = 'hashed_refresh_token';
      const errorMessage = 'Database error';
      const error = new Error(errorMessage);

      mockUserRepository.updateUserRefreshToken.mockRejectedValue(error);

      await expect(usersService.updateUserRefreshToken(userId, hashedRt)).rejects.toThrow(
        new BadRequestException(errorMessage),
      );
    });
  });
});
