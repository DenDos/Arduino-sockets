module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-npm')(shipit);
  require('shipit-shared')(shipit);
  // require('shipit-pm2')(shipit);

  shipit.initConfig({
    default: {
      workspace: 'tmp/shipit',
      deployTo: '/home/apps/rikuu',
      repositoryUrl: 'https://gitlab.com/Comeonandroid/rikuu',
      ignores: ['.git', 'node_modules','tmp','.DS_Store','bower_components','build'],
      rsync: ['--del'],
      keepReleases: 3,
      key: '~/.ssh/id_rsa',
      shallowClone: true,

      shared: {
        overwrite: true,
        dirs: [
          'uploads',
          {
            path: 'uploads',
            overwrite: true,
            chmod: '-R 777',
          }
        ]
      }
    },

    staging: {
      servers: 'root@95.85.28.210'
    }   

  });
};
