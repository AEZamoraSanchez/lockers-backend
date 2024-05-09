import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entitys/user.entity';
import { Repository } from 'typeorm';
import { UserToSign } from './dto/sign.dto';
import * as bcrypt from 'bcrypt';
import { TokenRefreshDto } from 'src/user/dto/tokenRefresh.dto';
import { UserToLogin } from './dto/login.dto';
import { userLoginWFacebook } from './dto/loginFacebook.dto';
import { randomBytes } from 'crypto';
import { userLoginWGoogle } from './dto/loginGoogle.dto';
@Injectable()
export class AuthService {
     constructor(
          @InjectRepository(User)
          private userRepository: Repository<User>,
          private jwtService : JwtService
     ){}

     async signupUser ( user : UserToSign) {
          try {
               const newUser = new User();
               const salt = await bcrypt.genSalt()

               newUser.username = user.username;
               newUser.email = user.email;
               newUser.password = await bcrypt.hash( user.password, salt )
               const userSaved = await this.userRepository.save(newUser)

               const tokenRefresh = await this.refreshToken()
               const accesToken = await this.accesToken( userSaved.id )

               const userLogged = {
                    accesToken,
                    tokenRefresh
               }
               return userLogged
          }
          catch (error) {
               if(error.code === "ER_DUP_ENTRY"){
                    throw new ConflictException(`the email ${user.email} is already registered`)
               }
               throw new Error (error)
          }
     }

     async loginUser ( user : UserToLogin ){
          try {
               const loggedUser = await this.userRepository.findOneBy({ email: user.email })
               if ( !loggedUser ) throw new NotFoundException('Not Found')

               const isMatch = await bcrypt.compare(user.password, loggedUser.password)
               if ( !isMatch ) throw new UnauthorizedException('Unauthorized');

               const tokenRefresh = await this.refreshToken()
               const accesToken = await this.accesToken( loggedUser.id )

               return {
                    accesToken,
                    tokenRefresh
               };
          }
          catch (error) {
               if(error.status == 404){
                    throw new NotFoundException('the email does not match any in the database')
               }
               if(error.status == 401){
                    throw new UnauthorizedException('the password does not match')
               }
          }
     }

     async saveFacebookUser( user : userLoginWFacebook ){
          try {
               const existingUser = await this.userRepository.findOneBy({ email : user.user.email })

               if(!existingUser){
                    const newUser = {
                         username : `${user.user.firstName} ${user.user.lastName}`,
                         email: user.user.email,
                         password: randomBytes(16).toString('hex')
                    }
                    const userRegistered = await this.userRepository.save(newUser)

                    const tokenRefresh = await this.refreshToken()
                    const accesToken = await this.accesToken( userRegistered.id )

                    return {
                         accesToken,
                         tokenRefresh
                    }
               }

               const tokenRefresh = await this.refreshToken()
               const accesToken = await this.accesToken( existingUser.id )

               return {
                    accesToken,
                    tokenRefresh
               }
          }
          catch (error) {
               throw new Error (error)
          }
     }

     async saveGoogleUser( user : userLoginWGoogle ){
          try {
               const existingUser = await this.userRepository.findOneBy({ email : user.email })
               
               if(!existingUser){
                    const newUser = {
                         username : `${user.firstName} ${user.lastName}`,
                         email: user.email,
                         password: randomBytes(16).toString('hex')
                    }
                    const userRegistered = await this.userRepository.save(newUser)

                    const tokenRefresh = await this.refreshToken()
                    const accesToken = await this.accesToken( userRegistered.id )

                    return {
                         accesToken,
                         tokenRefresh
                    }
               }

               const tokenRefresh = await this.refreshToken()
               const accesToken = await this.accesToken( existingUser.id )

               return {
                    accesToken,
                    tokenRefresh
               }
          }
          catch (error) {
               throw new Error (error)
          }
     }

     async refreshToken () {
          try {
               const refreshToken = this.jwtService.sign( { acces : true }, { expiresIn : '3d'})
               return refreshToken
          }
          catch (error) {
               throw new Error (error)
          }
     }

     async accesToken ( id : string ){
          try {
               const user = await this.userRepository.findOneBy({ id: id })
               if(!user){
                    throw new NotFoundException('Not Found');
               }
               
               const accessToken = this.jwtService.sign({ id : id }, { expiresIn: '1050d' })
               return accessToken
          }
          catch (error) {
               throw new NotFoundException(error.message);
          }
     }

}
