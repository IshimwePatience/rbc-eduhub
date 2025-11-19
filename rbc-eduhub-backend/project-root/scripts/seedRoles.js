// Seeder for default roles
// Run from project-root: node project-root/scripts/seedRoles.js

require('dotenv').config({ path: __dirname + '/../.env' });
const { Role } = require('../src/model');

const DEFAULT_ROLES = [
  { name: 'Learner', slug: 'learner', description: 'Student / Learner', isSystemRole: true, priority: 10 },
  { name: 'Instructor', slug: 'instructor', description: 'Course creator', isSystemRole: true, priority: 20 },
  { name: 'Admin', slug: 'admin', description: 'Organization admin', isSystemRole: true, priority: 30 },
  { name: 'Super Admin', slug: 'super-admin', description: 'Super administrator', isSystemRole: true, priority: 40 },
  { name: 'Data Analyst', slug: 'data-analyst', description: 'Analytics and reporting', isSystemRole: true, priority: 25 }
];

async function run() {
  try {
    console.log('Seeding roles...');
    for (const r of DEFAULT_ROLES) {
      const [role, created] = await Role.findOrCreate({
        where: { slug: r.slug },
        defaults: r
      });
      if (created) console.log('Created role:', role.name, role.id);
      else console.log('Exists:', role.name, role.id);
    }
    console.log('Done seeding roles.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err && err.message ? err.message : err);
    process.exit(1);
  }
}

run();
