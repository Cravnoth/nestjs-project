import { DeleteUserController } from '@app/controllers/user/delete-user.controller';
import { UserFactory } from '@core/domain/factories/user.factory';
import { User } from '@core/infrastructure/entities/user.entity';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserService } from '@services/user/delete-user.service';
import { NotFoundException } from '@shared/exceptions';

const userEntity: Partial<User> = {
  uuid: '27b0600a-201b-4a3c-9a68-0d766b9fdae6',
};

describe('DeleteUserController', () => {
  let deleteUserController: DeleteUserController;
  let deleteUserService: DeleteUserService;
  let userRepository: UserRepository;
  let userFactory: UserFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteUserController],
      providers: [
        {
          provide: DeleteUserService,
          useValue: {
            update: jest.fn().mockResolvedValue(userEntity),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntity),
          },
        },
        {
          provide: UserFactory,
          useValue: {
            update: jest.fn().mockResolvedValue(userEntity),
          },
        },
      ],
    }).compile();

    deleteUserController =
      module.get<DeleteUserController>(DeleteUserController);
    deleteUserService = module.get<DeleteUserService>(DeleteUserService);
    userRepository = module.get<UserRepository>(UserRepository);
    userFactory = module.get<UserFactory>(UserFactory);
  });

  it('should be defined', () => {
    expect(deleteUserController).toBeDefined();
    expect(deleteUserService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userFactory).toBeDefined();
  });

  describe('user', () => {
    it('should delete a user successfully', async () => {
      expect(
        await deleteUserController.handle({
          id: '27b0600a-201b-4a3c-9a68-0d766b9fdae6',
        }),
      );
      expect(deleteUserService.update).toHaveBeenCalledTimes(1);
    });

    it('should not delete a user with a wrong id', async () => {
      const errorMessage = 'User not found!';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      jest
        .spyOn(deleteUserService, 'update')
        .mockRejectedValue(new NotFoundException(errorMessage));

      expect(deleteUserController.handle({ id: '123' })).rejects.toThrowError(
        errorMessage,
      );
      expect(deleteUserService.update).toHaveBeenCalledTimes(1);
    });
  });
});
