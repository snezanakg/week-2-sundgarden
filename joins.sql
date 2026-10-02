-- Skill 2: Map the Country Club Relationships

-- 1. Foreign keys in cd.bookings:
-- memid references cd.members(memid)
-- facid references cd.facilities(facid)

-- 2. Members and facilities have a many-to-many relationship.
-- cd.bookings works as the junction table between them.
-- One member can book many facilities,
-- and one facility can be booked by many members.

-- 3. recommendedby in cd.members points back to cd.members(memid).
-- This is a self-referencing relationship.
-- One member can recommend several other members,
-- while each member can have one recommender.


-- 1. Retrieve the start times of members' bookings
SELECT bks.starttime
FROM cd.bookings bks
JOIN cd.members mems
ON mems.memid = bks.memid
WHERE mems.firstname = 'David'
AND mems.surname = 'Farrell';


-- 2. Work out the start times of bookings for tennis courts
SELECT bks.starttime AS start,
       facs.name
FROM cd.facilities facs
JOIN cd.bookings bks
ON facs.facid = bks.facid
WHERE facs.name IN ('Tennis Court 1', 'Tennis Court 2')
AND bks.starttime >= '2012-09-21'
AND bks.starttime < '2012-09-22'
ORDER BY bks.starttime;

-- 3. Produce a list of all members who have recommended another member
SELECT DISTINCT m.firstname,
       m.surname
FROM cd.members m
JOIN cd.members r
ON m.memid = r.recommendedby
ORDER BY m.surname, m.firstname;

-- 4. Produce a list of all members, along with their recommender
SELECT m.firstname,
       m.surname,
       r.firstname AS recommender_firstname,
       r.surname AS recommender_surname
FROM cd.members m
LEFT JOIN cd.members r
ON m.recommendedby = r.memid
ORDER BY m.surname, m.firstname;

-- 5. Produce a list of all members who have used a tennis court
SELECT DISTINCT
       m.firstname || ' ' || m.surname AS member,
       f.name AS facility
FROM cd.members m
JOIN cd.bookings b
ON m.memid = b.memid
JOIN cd.facilities f
ON b.facid = f.facid
WHERE f.name IN ('Tennis Court 1', 'Tennis Court 2')
ORDER BY member, facility;



-- 6. Produce a list of costly bookings
SELECT
    m.firstname || ' ' || m.surname AS member,
    f.name AS facility,
    CASE
        WHEN m.memid = 0 THEN b.slots * f.guestcost
        ELSE b.slots * f.membercost
    END AS cost
FROM cd.members m
JOIN cd.bookings b
ON m.memid = b.memid
JOIN cd.facilities f
ON b.facid = f.facid
WHERE b.starttime >= '2012-09-14'
AND b.starttime < '2012-09-15'
AND (
    (m.memid = 0 AND b.slots * f.guestcost > 30)
    OR
    (m.memid <> 0 AND b.slots * f.membercost > 30)
)
ORDER BY cost DESC;




-- 7. Produce a list of all members, along with their recommender, using no joins
SELECT DISTINCT
       m.firstname || ' ' || m.surname AS member,
       (
           SELECT r.firstname || ' ' || r.surname
           FROM cd.members r
           WHERE r.memid = m.recommendedby
       ) AS recommender
FROM cd.members m
ORDER BY member;

-- 8. Produce a list of costly bookings, using a subquery
SELECT member, facility, cost
FROM (
    SELECT
        m.firstname || ' ' || m.surname AS member,
        f.name AS facility,
        CASE
            WHEN m.memid = 0 THEN b.slots * f.guestcost
            ELSE b.slots * f.membercost
        END AS cost
    FROM cd.members m
    JOIN cd.bookings b
    ON m.memid = b.memid
    JOIN cd.facilities f
    ON b.facid = f.facid
    WHERE b.starttime >= '2012-09-14'
    AND b.starttime < '2012-09-15'
) AS bookings
WHERE cost > 30
ORDER BY cost DESC;