
#include <QGuiApplication>

#include <QDebug>

#include "reactappstate.h"


namespace {
QString reactAppState(Qt::ApplicationState state)
{
  switch (state) {
  case Qt::ApplicationSuspended:
  case Qt::ApplicationHidden:
    return "background";
  case Qt::ApplicationInactive:
    return "inactive";
  case Qt::ApplicationActive:
    return "active";
  }
}
}


void ReactAppState::getCurrentAppState(
 const ReactModuleInterface::ListArgumentBlock& success,
 const ReactModuleInterface::MapArgumentBlock& error
)
{
  success(m_bridge, QVariantList{QVariantMap{{"app_state", reactAppState(QGuiApplication::applicationState())}}});
}

ReactAppState::ReactAppState(QObject* parent)
  : QObject(parent)
{
}

ReactAppState::~ReactAppState()
{
}


void ReactAppState::setBridge(ReactBridge* bridge)
{
  m_bridge = bridge;
}

ReactViewManager* ReactAppState::viewManager()
{
  return nullptr;
}

QString ReactAppState::moduleName()
{
  return "RCTAppState";
}

QList<ReactModuleMethod*> ReactAppState::methodsToExport()
{
  return QList<ReactModuleMethod*>{};
}

QVariantMap ReactAppState::constantsToExport()
{
  return QVariantMap{};
}

