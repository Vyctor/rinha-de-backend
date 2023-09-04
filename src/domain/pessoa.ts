interface PessoaParams {
  apelido: string;
  nome: string;
  nascimento: string;
  stack: string[];
}

export default class Pessoa {
  private _apelido: string;
  private _nome: string;
  private _nascimento: string;
  private _stack: string[];

  private constructor(params: PessoaParams) {
    const error = this.validate(params);
    if (error) {
      throw new Error(error.error);
    }

    this._apelido = params.apelido;
    this._nome = params.nome;
    this._nascimento = params.nascimento;
    this._stack = params.stack;
  }

  get apelido(): string {
    return this._apelido;
  }

  get nome(): string {
    return this._nome;
  }

  get nascimento(): string {
    return this._nascimento;
  }

  get stack(): string[] {
    return this._stack;
  }

  static create(params: PessoaParams): Pessoa {
    return new Pessoa(params);
  }

  private validate(params: PessoaParams): {
    error: string;
    statusCode: number;
  } | null {
    if (!params.apelido) {
      return {
        error: 'Pessoa precisa ter um apelido',
        statusCode: 422,
      };
    }

    if (typeof params.apelido !== 'string') {
      return {
        error: 'Apelido precisa ser uma string',
        statusCode: 400,
      };
    }

    if (!params.nome) {
      return {
        error: 'Pessoa precisa ter um nome',
        statusCode: 422,
      };
    }

    if (typeof params.nome !== 'string') {
      return {
        error: 'Nome precisa ser uma string',
        statusCode: 400,
      };
    }

    if (!params.nascimento) {
      return {
        error: 'Pessoa precisa ter uma data de nascimento',
        statusCode: 422,
      };
    }

    if (params.stack && params.stack.length > 0) {
      params.stack.forEach((stack) => {
        if (typeof stack !== 'string') {
          return {
            error: 'Stack deve ser um array de string',
            statusCode: 400,
          };
        }
      });
    }

    return null;
  }

  toJSON() {
    return {
      apelido: this.apelido,
      nome: this.nome,
      nascimento: this.nascimento,
      stack: this.stack,
    };
  }
}
