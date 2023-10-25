import { PrivateClasses } from '../models/user.model';

/**
 * @description - Verify private occurrence only at a single time.
 * @param classes - All classes.
 * @param singleClass - Current class which need to be decide will it come or not.
 * @param i - Current class index.
 * @returns - Return boolean value to determine the current has been come earlier or not.
 */
export function getUniqueClasses(
  classes: PrivateClasses[],
  singleClass: PrivateClasses,
  i: number,
): boolean {
  return Boolean(
    classes.find(
      (privateClass, index) =>
        index < i &&
        privateClass.className === singleClass.className &&
        privateClass.usernameFromInstructor[0] ===
          singleClass.usernameFromInstructor[0],
    ),
  );
}

/**
 * @description - Get same classes group.
 * @param classes - All classes.
 * @param singleClass - Current class which need to be grouped with its similar ones.
 * @returns - Return all classes which has same name username according to current class.
 */
export function getSameClasses(
  classes: PrivateClasses[],
  singleClass: PrivateClasses,
): PrivateClasses[] {
  return classes.filter(
    (privateClass) =>
      privateClass.className === singleClass.className &&
      privateClass.usernameFromInstructor[0] ===
        singleClass.usernameFromInstructor[0],
  );
}

/**
 * @description - Get same classes group which contains provided day.
 * @param classes - All classes.
 * @param singleClass - Current class which need to be grouped with its similar ones.
 * @param day - Weekday.
 * @returns - Return all classes which has same name username according to current class and contains provided day.
 */
export function getSameClasseswithExistingDay(
  classes: PrivateClasses[],
  singleClass: PrivateClasses,
  day,
): PrivateClasses[] {
  const uniqueClasses = getSameClasses(classes, singleClass);
  return uniqueClasses.filter((privateClass) =>
    privateClass.weekdays?.find((weekday) => weekday.includes(day)),
  );
}

/**
 * @description - Get same classes group which contains provided hours.
 * @param classes - All classes.
 * @param singleClass - Current class which need to be grouped with its similar ones.
 * @param day - Weekday.
 * @param hour - Slots.
 * @returns - Return all classes which has same name username according to current class and contains provided hours.
 */
export function getSameClasseswithExistingSlot(
  classes: PrivateClasses[],
  singleClass: PrivateClasses,
  day,
  hour,
): PrivateClasses {
  const uniqueClasses = getSameClasseswithExistingDay(
    classes,
    singleClass,
    day,
  );
  console.log(uniqueClasses, hour);

  return uniqueClasses.find(
    (privateClass) =>
      hour >= privateClass.startTime && hour <= privateClass.endTime,
  );
}
