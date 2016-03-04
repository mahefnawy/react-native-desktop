/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule UIExplorerApp
 * @flow
 */
'use strict';

const React = require('react-native');
const UIExplorerActions = require('./UIExplorerActions');
const UIExplorerList = require('./UIExplorerList.ubuntu');
const UIExplorerExampleList = require('./UIExplorerExampleList');
const UIExplorerNavigationReducer = require('./UIExplorerNavigationReducer');
const UIExplorerStateTitleMap = require('./UIExplorerStateTitleMap');

const {
  AppRegistry,
  NavigationExperimental,
  StyleSheet,
  View,
} = React;

const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
  Header: NavigationHeader,
  Reducer: NavigationReducer,
  RootContainer: NavigationRootContainer,
} = NavigationExperimental;


import type { UIExplorerNavigationState } from './UIExplorerNavigationReducer';

import type { UIExplorerExample } from './UIExplorerList.ubuntu';


class UIExplorerApp extends React.Component {
  _navigationRootRef: ?NavigationRootContainer;
  _renderNavigation: Function;
  _renderOverlay: Function;
  _renderScene: Function;

  componentWillMount() {
    this._renderNavigation = this._renderNavigation.bind(this);
    this._renderOverlay = this._renderOverlay.bind(this);
    this._renderScene = this._renderScene.bind(this);
  }

  render() {
console.log('--- UIExplorerApp:render');
    return (
      <NavigationRootContainer
        persistenceKey="UIExplorerState"
        reducer={UIExplorerNavigationReducer}
        ref={navRootRef => { this._navigationRootRef = navRootRef; }}
        renderNavigation={this._renderNavigation}
      />
    );
  }

  _renderNavigation(navigationState: UIExplorerNavigationState, onNavigate: Function) {
console.log('--- UIExplorerApp:_renderNavigation: navigationState=' + util.inspect(navigationState));
    if (!navigationState) {
console.log('--- UIExplorerApp:_renderNavigation: returning - null state');
      return null;
    }
    if (navigationState.externalExample) {
console.log('--- UIExplorerApp:_renderNavigation: returning - component');
      var Component = UIExplorerList.Modules[navigationState.externalExample];
      return (
        <Component
          onExampleExit={() => {
            onNavigate(NavigationRootContainer.getBackAction());
          }}
        />
      );
    }
console.log('--- UIExplorerApp:_renderNavigation: returning - UIExplorerExampleList');
    return (
      <UIExplorerExampleList
        list={UIExplorerList}
        displayTitleRow={true}
      />
    );
  }

  _renderOverlay(props: NavigationStateRendererProps): ReactElement {
    return (
      <NavigationHeader
        navigationState={props.navigationParentState}
        position={props.position}
        getTitle={UIExplorerStateTitleMap}
      />
    );
  }

  _renderScene(state: Object): ?ReactElement {
    if (state.key === 'AppList') {
      return (
        <UIExplorerExampleList
          list={UIExplorerList}
          style={styles.exampleContainer}
          {...state}
        />
      );
    }

    const Example = UIExplorerList.Modules[state.key];
    if (Example) {
      const Component = UIExplorerExampleList.makeRenderable(Example);
      return (
        <View style={styles.exampleContainer}>
          <Component />
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  exampleContainer: {
    flex: 1,
    paddingTop: 60,
  },
});

AppRegistry.registerComponent('UIExplorerApp', () => UIExplorerApp);

module.exports = UIExplorerApp;
