export class Test {
  _id: string;
  user_state: string;
  test_state: string;
  test_result: string;
  priority: boolean;
  saude24: boolean;
  risk_group: boolean;
  risk_local: boolean;
  data: Date;
  user: [{ _id: string }, { name: string }];
}
