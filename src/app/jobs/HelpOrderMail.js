import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { name, email, id, question, answer } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: `Resposta ao chamado ${id}`,
      template: 'helpOrderAnswer',
      context: { student: name, id, question, answer },
    });
  }
}

export default new HelpOrderMail();
