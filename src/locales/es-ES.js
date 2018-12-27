import analysis from './es-ES/analysis';
import exception from './es-ES/exception';
import form from './es-ES/form';
import globalHeader from './es-ES/globalHeader';
import login from './es-ES/login';
import menu from './es-ES/menu';
import monitor from './es-ES/monitor';
import result from './es-ES/result';
import settingDrawer from './es-ES/settingDrawer';
import settings from './es-ES/settings';
import pwa from './es-ES/pwa';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.home.introduce': 'introduce',
  'app.forms.basic.title': 'Basic form',
  'app.forms.basic.description':
    'Form pages are used to collect or verify information to users, and basic forms are common in scenarios where there are fewer data items.',
  ...analysis,
  ...exception,
  ...form,
  ...globalHeader,
  ...login,
  ...menu,
  ...monitor,
  ...result,
  ...settingDrawer,
  ...settings,
  ...pwa,
};
