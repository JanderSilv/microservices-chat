import got from 'got/dist/source';

const SUM_SERVICE_API = 'http://sum-service:7400';

export default class SumService {
  static async sum(data: { num1: number; num2: number }) {
    const body = await got
      .post(`${SUM_SERVICE_API}/sum`, { json: data })
      .json();
    return body;
  }
}
