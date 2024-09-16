import { CreateUserController } from '@app/controllers/user/create-user.controller';
import { UserBodyDto } from '@core/domain/dtos/user.dto';
import { GenderEnum } from '@core/domain/enums/user.enum';
import { UserFactory } from '@core/domain/factories/user.factory';
import { User } from '@core/infrastructure/entities/user.entity';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from '@services/user/create-user.service';
import { BadRequestException } from '@shared/exceptions';

const userEntity: Partial<User> = {
  uuid: '27b0600a-201b-4a3c-9a68-0d766b9fdae6',
};

const body: UserBodyDto = {
  name: 'James Bond',
  alias: '007',
  document: '30067012086',
  birthDate: '1990-01-01',
  gender: GenderEnum.MALE,
};

describe('CreateUserController', () => {
  let createUserController: CreateUserController;
  let createUserService: CreateUserService;
  let userRepository: UserRepository;
  let userFactory: UserFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CreateUserService,
          useValue: {
            create: jest.fn().mockResolvedValue(userEntity),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(userEntity),
            findOne: jest.fn().mockResolvedValue(userEntity),
            findOneByDocument: jest.fn().mockResolvedValue(userEntity),
          },
        },
        {
          provide: UserFactory,
          useValue: {
            create: jest.fn().mockResolvedValue(userEntity),
          },
        },
      ],
    }).compile();

    createUserController =
      module.get<CreateUserController>(CreateUserController);
    createUserService = module.get<CreateUserService>(CreateUserService);
    userRepository = module.get<UserRepository>(UserRepository);
    userFactory = module.get<UserFactory>(UserFactory);
  });

  it('should be defined', () => {
    expect(createUserController).toBeDefined();
    expect(createUserService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userFactory).toBeDefined();
  });

  describe('user', () => {
    it('should create a user successfully', async () => {
      const result = await createUserController.handle(body);

      expect(createUserService.create).toHaveBeenCalledWith(body);
      expect(createUserService.create).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('id');
    });

    it('should not create a user with a wrong body', async () => {
      const errorMessage = 'document must be a string';

      const wrongBody: any = {
        name: 'James Bond',
        alias: '007',
        birthDate: '1990-01-01',
        gender: 'MALE',
      };

      jest
        .spyOn(createUserService, 'create')
        .mockRejectedValue(new BadRequestException(errorMessage));

      expect(createUserController.handle(wrongBody)).rejects.toThrowError(
        errorMessage,
      );
      expect(createUserService.create).toHaveBeenCalledWith(wrongBody);
      expect(createUserService.create).toHaveBeenCalledTimes(1);
    });
  });
});
