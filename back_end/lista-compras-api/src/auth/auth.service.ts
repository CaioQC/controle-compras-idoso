import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService 
    ){}

    async signIn(emailUsuario: string, senhaUsuario: string): Promise<{access_token: string}>{
        const usuario = await this.usuarioService.findByEmail(emailUsuario);

        if(!usuario){
            throw new UnauthorizedException("Credenciais inválidas");
        }

        const senhaEhValida = await bcrypt.compare(senhaUsuario, usuario.senha);

        if(!senhaEhValida){
            throw new UnauthorizedException("Credenciais inválidas");
        }

        const payload = { sub:  usuario.id, email: usuario.email, perfil: usuario.perfil};

        return { access_token: await this.jwtService.signAsync(payload) };
    }
}
