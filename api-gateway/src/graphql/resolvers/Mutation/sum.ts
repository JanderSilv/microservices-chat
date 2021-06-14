import SumService from '#root/adapters/SumService';

interface Args {
  num1: number;
  num2: number;
}

const sum = async (obj: any, { num1, num2 }: Args) => {
  return await SumService.sum({ num1, num2 });
};

export default sum;
