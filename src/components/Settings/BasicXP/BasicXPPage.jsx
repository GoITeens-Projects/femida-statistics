import { useState, useEffect } from 'react';
import { UnsavedChangesModal } from '../BadWord/UnsavedChangesModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SettingsNavigation } from '../SettingsNavigation/SettingsNavigation';
import styles from '../Events/EventsPage.module.css';
import Shadow from 'components/Shadow/Shadow';
import LimitsScope from 'components/LimitsScope/LimitsScope';
import PeriodOfLimits from 'components/PereiodOfLimits/PeriodOfLimits';
import { fetchSettings } from '../../../redux/settings/operation';
import { selectSettingsData } from '../../../redux/settings/selectors';
import { PatchSettings } from '../../../redux/settings/operation';
import { Trash2, ChevronDown } from 'lucide-react';
import limitsScopeStyles from '../../LimitsScope/LimitsScope.module.css';
import axios from '../../../redux/axiosConfig';
import { PeriodsSettings } from '../PeriodsSettings/PeriodsSettings';
import { BasicXPSettings } from '../BasicXPSettings/BasicXPSettings';

export const BasicXPPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = useSelector(selectSettingsData);

   const basicSubmit = (message, voice, stage, boost, voiceWithAdmin, invite) => {
      dispatch(PatchSettings({settings: {
        xps: {
          message, voice, stage, boost, voiceWithAdmin, invite
        }
      }}))
      dispatch(fetchSettings());
  }

  return (
   <>
 <BasicXPSettings 
        thisMessage={settings.settings.xps.message}
  thisVoice={settings.settings.xps.voice}
  thisStage={settings.settings.xps.stage}
  thisBoost={settings.settings.xps.boost}
  thisVoiceWithAdmin={settings.settings.xps.voiceWithAdmin}
  // thisStudentsK
  thisInvite={settings.settings.xps.invite}
  onSubmit={basicSubmit}
  />
    </>
  );
};
