import { Model } from "reboundjs";

@baseUrl('/users')
@idAttribute('cid')
class User extends Model {

  initialize(cid){
    if (cid !== void 0) this.set('cid', cid).fetch();
  }

  firstName = 'John';
  lastName = 'Doe';
  nicknames = [ 'Jo', 'Buddy'];

  get fullName(){
    return this.get('firstName') + ' ' + this.get('lastName') + this.get('nicknames[1]');
  }

}

export default User;
