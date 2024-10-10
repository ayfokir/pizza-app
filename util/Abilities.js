import { AbilityBuilder, Ability } from '@casl/ability';

export function defineAbilitiesFor(roles, id) {
  const { can, cannot, rules } = new AbilityBuilder(Ability);

  roles?.forEach(role => {
    if (role === 'Super Admin') {
      can('manage', 'all'); // Super Admin can manage everything
    } else if (role === 'Kitchen Man') {
      can('read', 'orders');
      // can('create', 'Post');
      // can('update', 'order', { authorId: id }); // Ensure 'id' is defined
      can('update', 'order'); // Ensure 'id' is defined
    } else if (role === 'Add Menu') {
      can('create', 'Pizza'); // Regular users can only read posts
    }
    // Add more role checks as necessary
  });

  return new Ability(rules);
}
